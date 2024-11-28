import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprulService {

  private localfronturl = 'https://localhost:4200/'
  private localbackendurl = 'https://localhost:8080/'

  private ec2frontendurl = 'https://50.16.52.223:443/'
  private ec2backendurl = 'https://100.29.24.217:8080/'

  private actualfrontendurl = this.ec2frontendurl;
  private actualbackendurl = this.ec2backendurl;

  constructor() { }


  public getActualFrontendUrl(): string {
    return this.actualfrontendurl;
  }

  public getActualBackendUrl(): string {
    return this.actualbackendurl; 
  }

}
