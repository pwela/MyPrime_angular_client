import { Injectable } from "@angular/core";
//import { catchError } from 'rxjs/internal/operators';
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

/** Declaring the api url that will provide data for the client app*/
const apiUrl = "https://my-prime-movies-95318ccd1782.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "users/", userDetails)
      .pipe(catchError(this.handleError));
  }
  // User login

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const userDetailsURI =
      "?Username=" + userDetails.Username + "&Password=" + userDetails.Password;
    return this.http
      .post(apiUrl + "login" + userDetailsURI, {}) // here userDetails will be : "?Username"=user.username + &Password="user.password"
      .pipe(this.extractResponseData, catchError(this.handleError)); // The response will user Object + token to store in local storage
  }

  // Get all the movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  /** Get One movie*/
  getOneMovie(movieDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/" + encodeURIComponent(movieDetails), {
        // here movieDetails = movie.title
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  /** Get movie  director*/
  getDirector(movieDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(
        apiUrl + "movies/" + encodeURIComponent(movieDetails) + "/director",
        {
          // here movieDetails = movie.title
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  /** Get movie  genre*/
  getGenre(movieDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/" + encodeURIComponent(movieDetails) + "/genre", {
        // here movieDetails = movie.Title
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  /** Get a user*/
  getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") || "";
    return this.http
      .get(apiUrl + "users/" + encodeURIComponent(user), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  // Edit a user
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") || " ";
    return this.http
      .put(apiUrl + "users/" + encodeURIComponent(user), userDetails, {
        // here userDetails = user.username
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }
  //Add a favourite movie to user profile
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user") || "{}";
    return this.http
      .post(
        apiUrl +
          "users/" +
          encodeURIComponent(user) +
          "/movies/" +
          encodeURIComponent(movieID),
        {},
        {
          // here userDetails = user.username
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  //remove a favourite movie to user profile
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") || "{}";
    return this.http
      .delete(
        apiUrl +
          "users/" +
          encodeURIComponent(user) +
          "/movies/" +
          encodeURIComponent(movieID),
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  //delete a user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") || "";
    console.log(user);
    return this.http
      .delete(apiUrl + "users/" + encodeURIComponent(user), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
        }),
        responseType: "text",
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
      console.log(error);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
