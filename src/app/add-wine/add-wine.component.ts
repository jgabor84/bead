import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Wine } from '../models/wine.model';
import { FormBuilder,FormGroup } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.css']
})
export class AddWineComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:4200/api/upload',
    itemAlias: 'image'
  });


  wineForm: FormGroup = this.formBuilder.group({
    name: null, 
    img:null,
    winery: null,
    description: null,
    type: null,
    year: null,
    alcohol: null,
    color: null,
    sku: null,
    price: null,
    discount: null,
    quantity: null
  });



  form: any = {
    name: null, 
    winery: null,
    description: null,
    type: null,
    year: null,
    alcohol: null,
    color: null,
    sku: null,
    price: null,
    discount: null,
    quantity: null
  };

    
    shop: boolean = true;
    createTime:  Date;
    updateTime:  Date;

    filename: any = null;

    isSuccessful = false;

  constructor(private userService:UserService, private formBuilder: FormBuilder, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    console.log(data);
    this.filename = data.file;
}

  onSubmit(): void {
    

    const wine = this.wineForm.getRawValue();
    wine.shop = true;
    wine.imgs = this.filename;
    wine.landing = true;
    wine.createTime = new Date();
    wine.updateTime = new Date();
    console.log("submit");

    try {
      this.userService.addWine(wine);
      this.isSuccessful = true;
      console.log(JSON.stringify(wine));
    } catch (error) {
      console.log(error);
    }

  }

}
