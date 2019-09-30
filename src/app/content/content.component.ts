import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private hhtpClient: HttpClient, private toastr: ToastrService) { }
  obj: any;
  isloading = false;
  objects = '';
  ngOnInit() {
  }
  onClickMe(inputvalue) {
    // console.log('https://api.github.com/users/' + inputvalue);
    // tslint:disable-next-line: max-line-length

    if (localStorage.getItem(inputvalue) != null) {
      this.isloading = true;
      this.obj = JSON.parse(localStorage.getItem(inputvalue));
      this.isloading = false;
      this.toastr.success('Success');
    } else {
      this.isloading = true;
      // tslint:disable-next-line: max-line-length
      this.hhtpClient.get('https://api.github.com/users/' + inputvalue + '?access_token=511b20c9c69d17ab7ba23475cbe5e49708aedd27').subscribe(res => {
        this.obj = res;
        console.log(this.obj);
        this.isloading = false;
        this.toastr.success('Success');
        this.objects = JSON.stringify(this.obj);
        localStorage.setItem(inputvalue, this.objects);
      }, err => {
        this.obj = null;
        console.log(err);
        this.isloading = false;
        this.toastr.error('Invalid user');
      }
      );
    }
  }
}
