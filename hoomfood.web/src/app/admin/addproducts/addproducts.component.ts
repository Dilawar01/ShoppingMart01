import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageserviceService } from '../../Services/imageservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestserviceService } from '../../Services/restservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/shared/models/product.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  dynamicFormArray: any;
  dynamicFormGroup: FormGroup;
  finalData = [];

  base64textString: string;
  submitted = false;
  checkoutForm: FormGroup
  public imagePath;
  imgURL: any;
  public message: string;
  selectedFile: File
  images = []
  
  urls = [];
  
  modelData: any = []
  model: any = []
  cities: any[] = []
  SubCategoryId: number;
  categoryid: number
  CategoryName: string;
  SubCategoryName: string;

  value: FormGroup;
  get f() { return this.checkoutForm.controls; }
  provinceList: Array<any> = [
    {},
    { name: 'kpk', cities: ['', 'Abbottabad', 'Bannu', 'Battagram', 'Buner', 'Charsadda', 'Chitral', 'Dera Ismail Khan', 'Hangu', 'Haripur', 'Karak', 'Kohat', 'Charsadda', 'Lakki Marwat', 'Lower Dir'] },
    { name: 'punjab', cities: ['', 'Attock', 'Bahawalnagar', 'Bahawalpur', 'Bhakkar', '	Chakwal', '	Chiniot', '	Dera Ghazi Khan', 'Faisalabad', '	Gujranwala', '	Gujrat', 'Hafizabad', 'Jhang', 'Jhelum', 'Kasur'] },
    { name: 'sindh', cities: ['', 'Hyderabad', '	Karachi', 'Badin', '	Bandhi', '	Bhiria City', 'Bhirkan', 'Chak', '		Dadu', 'Daharki', '	Daulatpur', '		Digri', 'Gambat', 'Jungshahi', 'Islamkot'] },
    { name: 'balochistan', cities: ['', 'Quetta', 'Turbat.', 'Khuzdar.', 'Hub, Balochistan', '	Chaman', '	Gwadar', '	Dera Allah Yar', 'Sibi', '	Nushki', '	Chitkan', 'Qilla Saifullah', '	Muslim Bagh', '	Qilla Abdullah', 'Washuk'] },
    { name: 'gilgit', cities: ['', 'Diamer', 'Ghanche', 'Ghizer', 'Gilgit', '	Gojal Upper Hunza', '	Kharmang', 'Nagar', 'Astore', '	Skardu'] },
  ];

  constructor (private sanitizer: DomSanitizer, private imageService: ImageserviceService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private rs: RestserviceService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.checkoutForm = formBuilder.group({
      category: formBuilder.control('initial value', Validators.required)
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.CategoryName = params.get('categ');
      this.SubCategoryId = Number(params.get('id'));
      this.SubCategoryName = params.get('subcateg');
      this.categoryid = Number(params.get('categid'));
    });
  
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      categoryid: [this.categoryid],
      subcategoryid: [this.SubCategoryId],
      Product_Name: ['', Validators.required],
      Product_Description: ['', Validators.required],
      category: [this.capitalizeFirstLetter(this.CategoryName)],
      type: [this.capitalizeFirstLetter(this.SubCategoryName)],
      Product_Price: ['', Validators.required],
      Model_number: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],     
    });

    // 
    this.dynamicFormGroup= this.formBuilder.group({});

    this.http.get(`http://localhost:3000/DynamicFormFields?categoryid=` +  this.SubCategoryId)
      .subscribe((x: any) => {
        this.dynamicFormArray = x.map(u => u.controls)
        console.log("from::", this.dynamicFormArray)
        this.createDynamicFormControl();
      });   
  }

  // 
  createDynamicFormControl(){
      this.dynamicFormArray.forEach(element => {
        element.forEach(x => {
          this.dynamicFormGroup.addControl(x.id, new FormControl(''));
        });       
      });
      console.log(this.dynamicFormGroup)
  }
  // 
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader()
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.urls.push(reader.result)
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.images.push({ img: this.base64textString })
    console.log('string', btoa(binaryString));
  }

  onSubmit(id): void {
    this.rs.createProduct(id, this.finalData[0])
      .subscribe(
        (response) => {
          console.log("response",response)
        },
        error => console.error(error)
      )
    this.checkoutForm.reset();
    this.router.navigateByUrl('/home')
  }
 
  onUpload() {
    console.log("statiic form",this.checkoutForm.value)
    console.log("dynamic form",this.dynamicFormGroup.value)
    this.finalData.push({
      ...this.checkoutForm.value,
      ...this.dynamicFormGroup.value
    });
    console.log(this.finalData[0])
    this.submitted = true;

    const image = {
      Product_Image: this.images
    }
    this.http.post('http://localhost:3000/Product', image).subscribe(
      (res: any) => {
        this.onSubmit(res.id)
      },
      (err) => {
        console.error(err)
      })
  }

  onValueChange(event) {
    this.productService.getSubCategory(event).subscribe((filterData: any) => {
      this.modelData = filterData;
      console.log('name', event)
      console.log('value', filterData)
    })
  }

  changeProvince(count) {
    this.cities = this.provinceList.find(con => con.name == count).cities;
  }
  onSubCategoryValueChanges(event) {

  }
}


