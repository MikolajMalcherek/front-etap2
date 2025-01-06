import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprulService {

  private localfronturl = 'https://localhost:443/front/'
  private localbackendurl = 'https://localhost:8081/'

  private ec2frontendurl = 'https://message-app-1932806518.us-east-1.elb.amazonaws.com:443/front/'
  private ec2backendurl = 'https://message-app-1932806518.us-east-1.elb.amazonaws.com:8081/'

  private actualfrontendurl = this.ec2frontendurl;
  private actualbackendurl = this.localbackendurl;

  constructor() { }


  public getActualFrontendUrl(): string {
    return this.actualfrontendurl;
  }

  public getActualBackendUrl(): string {
    return this.actualbackendurl; 
  }

}
