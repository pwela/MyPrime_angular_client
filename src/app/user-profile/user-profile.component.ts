import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
// This import is used to display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent {
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  userProfile: any;
  updateSection: boolean = false;
  //psection = document.getElementById("profileContainer");
  favoriteMovies: any[] = [];
  //favoriteMovies2: any[] = [];
  movies: any[] = [];
  profileView: boolean = true;
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    private location: Location
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem("user") || "";
    //console.log(user);
    this.location.replaceState("users/" + encodeURIComponent(user));
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userProfile = resp;

      if (
        this.userProfile.FavoriteMovies &&
        this.userProfile.FavoriteMovies.length > 0
      ) {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;

          this.favoriteMovies = this.movies.filter((movie) =>
            this.userProfile.FavoriteMovies.includes(movie._id)
          );

          return this.favoriteMovies;
        });
      } else {
        return;
      }
      return this.userProfile;
    });
  }
  toggleUpdateSection(): void {
    if (this.updateSection) {
      this.updateSection = false;
      console.log("this.updateSection: ", this.updateSection);
    } else {
      this.updateSection = true;
      console.log("this.updateSection: ", this.updateSection);
    }
  }
  getFavoriteMovies(): void {
    console.log(this.userProfile);
    if (
      this.userProfile.FavoriteMovies &&
      this.userProfile.FavoriteMovies.length > 0
    ) {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        this.favoriteMovies = this.movies.filter((movie) =>
          this.userProfile.FavoriteMovies.includes(movie._id)
        );
        console.log(this.favoriteMovies);
        return this.favoriteMovies;
      });
    } else {
      return;
    }
  }
  goToHomeScreen(): void {
    this.router.navigate(["movies"]);
  }

  updateProfile(): void {
    this.fetchApiData.updateUser(this.userData).subscribe(
      (result) => {
        // Logic for a successful user update goes here! (To be implemented)

        console.log(result);
        this.snackBar.open(
          result.Username + " 's account updated you will be logged out",
          "OK",
          {
            duration: 2000,
          }
        );
        localStorage.clear();
        this.router.navigate(["welcome"]);
      },
      (result) => {
        this.snackBar.open(result, "OK", { duration: 2000 });
      }
    );
  }
  deleteProfile(): void {
    if (confirm(`Are you sure to delete ${this.userProfile.Username} ?`)) {
      this.fetchApiData.deleteUser().subscribe(
        (result) => {
          console.log(result);
          localStorage.clear();
          this.router.navigate(["welcome"]);
          this.snackBar.open(`${result}. You have been logged out`, "OK", {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open(result, "OK", { duration: 2000 });
        }
      );
    }

    //   this.fetchApiData.deleteUser().subscribe((resp: string) => {
    //     console.log(resp);
    //     this.snackBar.open(" Account deleted you will be logged out", "OK", {
    //       duration: 2000,
    //     });
    //     localStorage.clear();
    //     this.router.navigate(["welcome"]);
    //   });
    // }
  }
}
