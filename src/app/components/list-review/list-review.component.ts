import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Review } from '../../models/review.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
  reviews: Review[];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,) { }

 async ngOnInit(): Promise<void> {
  const id = this.activatedRoute.snapshot.params.id;
    await this.userService
    .getWineReviews(id)
    .then((data: Review[]) => {
      this.reviews = data;
      console.log('reviews: '+JSON.stringify(this.reviews));
      
    });
  }

}
