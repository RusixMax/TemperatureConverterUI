import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertedTempData, TempConversionDataModel } from '../shared/models/convertedTempData';
import { TemperatureInput } from '../shared/models/tempInputData';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {



  temperatureForm       : FormGroup;
  temperatureFromCtrl   = new FormControl('', [Validators.required]); 
  temperatureToCtrl     = new FormControl('', [Validators.required]); 
  temperatureValueCtrl  = new FormControl('', [Validators.required]); 

  temperatureMetaData   : string[]=[];
  resultData            : TempConversionDataModel = new TempConversionDataModel();
  temperatureTypesToConvert  : string[]=[];
  inputDataModel        : TemperatureInput;
  isProcessing          : boolean = false;
  errorMessage          :string;

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.InitializePage();
  }


  InitializePage()
  { 
    this.temperatureForm = this.formBuilder.group({
      temperatureFromCtrl: this.temperatureFromCtrl,
      temperatureToCtrl: this.temperatureToCtrl,
      temperatureValueCtrl: this.temperatureValueCtrl     
    });

    this.getMetadata();
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.temperatureForm.controls[controlName].touched && this.temperatureForm.controls[controlName].hasError(errorName);
  }


  
  selectAll(ev:any){
    if(ev._selected){
    this.temperatureToCtrl.setValue([]);
    this.temperatureMetaData.forEach(t =>
      this.temperatureTypesToConvert.push(t));
      this.temperatureTypesToConvert = this.temperatureTypesToConvert.filter(f=> f != this.temperatureFromCtrl.value);
    this.temperatureToCtrl.setValue(this.temperatureTypesToConvert);
     ev._selected=true;
    }
    if(ev._selected==false){
      this.temperatureToCtrl.setValue([]);
      this.temperatureTypesToConvert = [];
    }   
  }


  getMetadata() {
    this.sharedService.getMetaData()
      .subscribe(
        (data) => {
          this.temperatureMetaData = <string[]>data.data;
        }
      );

    }

  
  getConvertedData(formElement:any){
  
    if(!this.temperatureForm.invalid){

      this.inputDataModel = new TemperatureInput();
      this.inputDataModel.TemperatureType = String(formElement.controls["temperatureFromCtrl"].value);
      this.inputDataModel.TemperatureValue = Number(formElement.controls["temperatureValueCtrl"].value);
      this.inputDataModel.TemperatureTypesToConvert = this.temperatureTypesToConvert && this.temperatureTypesToConvert.length > 0 ? 
                        this.temperatureTypesToConvert : this.temperatureToCtrl.value;

      this.isProcessing

      this.sharedService.getConvertTemperatureData(this.inputDataModel).subscribe(
        (data) => {     
            this.isProcessing = false;
            this.resultData.ConvertedData = data.data.convertedData;
 
        },
      (_error) => { console.log(_error); 

        this.isProcessing = false;
        this.errorMessage = "Something went wrong, please try again";
      
      },
      () => { 
        
      }
      )
    }
   

  }

  
  clearForm() {
   
    this.temperatureToCtrl.setValue('');
    this.temperatureTypesToConvert = [];
    this.temperatureFromCtrl.setValue([]);
    this.temperatureValueCtrl.setValue('');
    this.resultData = new TempConversionDataModel();  

  }

  onTemperatureTypeChange(){
    this.temperatureToCtrl.setValue([]);
    this.temperatureTypesToConvert = [];
  }


  }



