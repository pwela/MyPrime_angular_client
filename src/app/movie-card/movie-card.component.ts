import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MovieViewComponent } from "../movie-view/movie-view.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
  movies: any[] = [];
  movieView: string = "";
  userProfile: any;
  favoriteMoviesListParsed: any;
  /**
   * used to signal the component to display the profileView
   */
  @Input() profileView: boolean = false;

  /**
   * favorite movies imported from profile view
   */
  @Input() favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    let favoriteMoviesList = localStorage.getItem("favoriteMoviesList") || "";
    this.favoriteMoviesListParsed = JSON.parse(favoriteMoviesList);

    this.getMovies();
    //this.userProfile = localStorage.getItem("userProfile");
    //console.log(this.userProfile);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  openProfilePage(): void {
    //window.location.reload();
    const user = localStorage.getItem("user") || "";
    console.log(user);
    this.router.navigate(["users"]);
  }

  logout(): void {
    if (confirm(`Confirm logout ?`)) {
      localStorage.clear();
      this.router.navigate(["welcome"]);
    }
  }

  showDirector(movie: any): void {
    this.movieView = "director";
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie, movieView: this.movieView },
    });
  }
  showGenre(movie: any): void {
    this.movieView = "genre";
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie, movieView: this.movieView },
    });
  }
  showSynopsis(movie: any): void {
    this.movieView = "synopsis";
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie, movieView: this.movieView },
    });
  }

  addFavoriteMovie(movie: any): void {
    if (this.favoriteMoviesListParsed.includes(movie._id)) {
      this.snackBar.open(movie.Title + " alredy in fav", "OK", {
        duration: 2000,
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe(
        (result) => {
          // Update the favorite movie list in local storage

          let favoriteMoviesListStringified = JSON.stringify(
            result.FavoriteMovies
          );
          localStorage.setItem(
            "favoriteMoviesList",
            favoriteMoviesListStringified
          );
          this.snackBar.open(movie.Title + " added to favorites", "OK", {
            duration: 2000,
          });
          // reload the component with the updated icon
          if (this.profileView) window.location.reload();
          else this.ngOnInit();
        },
        (result) => {
          this.snackBar.open(result, "OK", { duration: 2000 });
        }
      );
    }
  }

  deleteFavoriteMovie(movie: any): void {
    if (!this.favoriteMoviesListParsed.includes(movie._id)) {
      this.snackBar.open(movie.Title + " not in favorites", "OK", {
        duration: 2000,
      });
    } else {
      this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe(
        (result) => {
          let favoriteMoviesListStringified = JSON.stringify(
            result.FavoriteMovies
          );
          // Update the favorite movie list in local storage
          localStorage.setItem(
            "favoriteMoviesList",
            favoriteMoviesListStringified
          );
          this.snackBar.open(movie.Title + " removed from favorites", "OK", {
            duration: 2000,
          });
          // reload the component with the updated icon
          if (this.profileView) window.location.reload();
          else this.ngOnInit();
        },
        (result) => {
          this.snackBar.open(result, "OK", { duration: 2000 });
        }
      );
    }
  }
}
