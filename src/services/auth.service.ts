import { Injectable } from '@angular/core';
import { AuthenticationDetails,CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as CryptoJS from 'crypto-js';

const poolData = {
  UserPoolId: 'us-east-1_4yfC1bWWo',
  ClientId: '4u16sf8bhgdvjdf01b3uccgo8u',
  ClientSecret: '13gslogc221332pma0qt7m4ci85tcesspu1tau2e135k787k851o'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   private userPool = new CognitoUserPool({
//     UserPoolId: 'us-east-1_4yfC1bWWo',
//     ClientId: '4u16sf8bhgdvjdf01b3uccgo8u'
//   });


//   constructor() { }

//   generateSecretHash(username: string): string {
//     const message = username + poolData.ClientId; // Łączenie username i clientId
//     const secretHash = CryptoJS.HmacSHA256(message, poolData.ClientSecret).toString(CryptoJS.enc.Base64);
//     return secretHash;
//   }

//   // Rejestracja użytkownika
//   signUp(username: string, password: string) {
//     const secretHash = this.generateSecretHash(username);
    
//     // Atrybuty użytkownika, w tym SECRET_HASH
//     const attributeList = [
//       new CognitoUserAttribute({
//         Name: 'name',  // Zmień na odpowiednie atrybuty
//         Value: username
//       })
//     ];

//     // Parametry rejestracji
//     const clientMetadata = {
//       key: "value"  // Możesz dodać niestandardowe dane
//     };

//     return new Promise((resolve, reject) => {
//       // Rejestracja użytkownika z SECRET_HASH
//       userPool.signUp(username, password, attributeList, clientMetadata, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   }
  

//   // Logowanie użytkownika
//   signIn(username: string, password: string) {
//     const authenticationDetails = new AuthenticationDetails({
//       Username: username,
//       Password: password
//     });

//     const cognitoUser = new CognitoUser({
//       Username: username,
//       Pool: this.userPool
//     });

//     return new Promise((resolve, reject) => {
//       cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: (result) => {
//           resolve(result);
//         },
//         onFailure: (err) => {
//           reject(err);
//         }
//       });
//     });
//   }

//   // Wylogowanie użytkownika
//   signOut() {
//     const cognitoUser = this.userPool.getCurrentUser();
//     if (cognitoUser) {
//       cognitoUser.signOut();
//     }
//   }
  
  // login(username: string, password: string): Promise<any> {
  //   const userData = {
  //     Username: username,
  //     Pool: userPool
  //   };

  //   const cognitoUser = new CognitoUser(userData);
  //   const authenticationDetails = new AuthenticationDetails({
  //     Username: username,
  //     Password: password
  //   });

  //   return new Promise((resolve, reject) => {
  //     cognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: (result) => resolve(result),
  //       onFailure: (err) => reject(err)
  //     });
  //   });
  // }
}
