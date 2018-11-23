import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AndroidPermissions } from '@ionic-native/android-permissions'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public androidPermissions: AndroidPermissions, public qrScanner: QRScanner) {

  }

  startScanner(){
    console.log("Start Scanning");

        // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        //alert('authorized');

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
        // alert(text);
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.navCtrl.pop();
        });

        this.qrScanner.resumePreview();

        // show camera preview
        this.qrScanner.show()
        .then((data : QRScannerStatus)=> { 
          console.log('datashowing', data.showing);
          //alert(data.showing);
        },err => {
          //alert(err);

        });

        // wait for user to scan something, then the observable callback will be called

      } else if (status.denied) {
        alert('denied');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        alert('else');
      }
    })
    .catch((e: any) => {
      alert('Error is' + e);
    });
  }

}
