import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-movie-view",
  templateUrl: "./movie-view.component.html",
  styleUrls: ["./movie-view.component.scss"],
})
export class MovieViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  movie: any = this.data.movie;
  movieView: string = this.data.movieView;
  ngOnInit(): void {}
}
