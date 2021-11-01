import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Wine } from '../../models/wine.model';
import { User } from '../../models/user.model';
import { FormArray, FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

whiteColors = [
  {color:"víz-szerű",hex:"#f9fdeb",tone:"mély"},	{color:"zöldes citrom",hex:"#dffeae",tone:"mély"},	{color:"citrom",hex:"#e5e500",tone:"mély"},	{color:"szalma",hex:"#f8f6c3",tone:"mély"},	{color:"arany",hex:"#e5c100",tone:"mély"},	{color:"borostyán",hex:"#a38900",tone:"mély"},
{color:"víz-szerű",hex:"#fafef0",tone:"mély"},	{color:"zöldes citrom",hex:"#e8fec6",tone:"mély"},	{color:"citrom",hex:"#ffff00",tone:"mély"},	{color:"szalma",hex:"#faf8d5",tone:"mély"},	{color:"arany",hex:"#ffd700",tone:"mély"},	{color:"borostyán",hex:"#b79a00",tone:"mély"},
{color:"víz-szerű",hex:"#fdfefa",tone:"mély"},	{color:"zöldes citrom",hex:"#effed6",tone:"mély"},	{color:"citrom",hex:"#ffff66",tone:"mély"},	{color:"szalma",hex:"#fbfae1",tone:"mély"},	{color:"arany",hex:"#ffe34c",tone:"mély"},	{color:"borostyán",hex:"#ccac00",tone:"mély"},
]			
roseColors=[					
{color:"pink",hex:"#ed6188",tone:"mély"},	{color:"lazac",hex:"#f45154",tone:"mély"},	{color:"eper",hex:"#f74743",tone:"mély"},	{color:"hagymahéj",hex:"#e9885b",tone:"mély"},		
{color:"pink",hex:"#f184a2",tone:"közepes"},	{color:"lazac",hex:"#f67376",tone:"közepes"},	{color:"eper",hex:"#f9706d",tone:"közepes"},	{color:"hagymahéj",hex:"#eea684",tone:"közepes"},		
{color:"pink",hex:"#f5a7bd",tone:"halvány"},	{color:"lazac",hex:"#f9a8a9",tone:"halvány"},	{color:"eper",hex:"#fb9997",tone:"halvány"},	{color:"hagymahéj",hex:"#f4c3ad",tone:"halvány"},		
]
redColors = [			
					
{color:"bíbor",hex:"#69003f",tone:"mély"},	{color:"rubin",hex:"#850006",tone:"mély"},	{color:"gránát",hex:"#6b000c",tone:"mély"},	{color:"vöröses barna",hex:"#5c0000",tone:"mély"},	{color:"mahagóni",hex:"#4b0001",tone:"mély"},	
{color:"bíbor",hex:"#750046",tone:"közepes"},	{color:"rubin",hex:"#980007",tone:"közepes"},	{color:"gránát",hex:"#7a000e",tone:"közepes"},	{color:"vöröses barna",hex:"#740001",tone:"közepes"},	{color:"mahagóni",hex:"#5d191a",tone:"közepes"},	
{color:"bíbor",hex:"#90326a",tone:"halvány"},	{color:"rubin",hex:"#ab0008",tone:"halvány"},	{color:"gránát",hex:"#890010",tone:"halvány"},	{color:"vöröses barna",hex:"#8f3233",tone:"halvány"},	{color:"mahagóni",hex:"#6e3233",tone:"halvány"}


]



  isLoggedIn = false;
  username?: string;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  user: User;
  wine: Wine;
  radioSelected:any;

  reviewForm: FormGroup = this.formBuilder.group({
    id: null,
    color: null,
color_comment: null,
intensity: null,
nose_character: null,
nose_comment:null,
sweetness: null,
acidity: null,
alc_content: null,
tannin_quantity: null,
tannin_quality: null,
body: null,
taste_character: null,
length: null,
taste_comment: null,
rating: null,
published: null,
colors:null,
    user: null,
    wine: null
    
  });
  createTime: Date;
  isSuccessful = false;

  reviewFormGroup:FormGroup;
  uid: any;
  
  constructor(private userService:UserService, private formBuilder: FormBuilder,
 private authService: AuthService, private tokenStorage: TokenStorageService, private activatedRoute: ActivatedRoute,
    ) { }
    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
      this.username = tokenInfo.username;
      this.uid = tokenInfo.userId;
    }
    else{
      this.isLoginFailed = true;
      
    }

    



  }
  async onSubmit(): Promise<void> {
    const id = this.activatedRoute.snapshot.params.id;
    console.log("iiiid "+id);
    this.user = await this.userService.getUserById(this.uid);
    this.wine = await this.userService.getWineById(id);

    const review = this.reviewForm.getRawValue();
    review.wine = this.wine;
    review.user = this.user;
    review.createTime = new Date();
    review.published = true;
    /*const review={
      id:0,
      color: 'red',
      color_comment: 'comment',
      intensity: 'intensity',
      nose_character: 'nosechar',
      nose_comment:'nose comment',
      sweetness: 'sweetness',
      acidity: 'acid',
      alc_content: 'alc',
      tannin_quantity: 'tannin qual',
      tannin_quality: 'tannin quant',
      body: 'body',
      taste_character: 'tastechar',
      length: 'len',
      taste_comment: 'tastecomment',
      rating: 5,
      published: true,
      createTime: new Date(),
      user:this.user,
      wine: this.wine
         
    }*/
    
    
    
    console.log("submit");

    this.userService.addReview(review).then(
      data => {
        this.isSuccessful = true;
        
      },
      err => {
        this.isLoginFailed=true;
        this.errorMessage = JSON.parse(err.error).message;
      }
    );




    /*try {
      this.userService.addReview(review);
      this.isSuccessful = true;
      console.log(JSON.stringify(review));
    } catch (error:any) {
      this.isLoginFailed = true;
      this.errorMessage = error;
    }*/

  }

  getSelecteditem(){
    this.radioSelected = this.reviewForm.value.colors;
    
  }

  

}
