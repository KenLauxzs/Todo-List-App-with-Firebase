import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FirebaseService, List } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @Input() id: string;
  list: List[] = [];
  
  constructor(public alertController: AlertController, public toastController: ToastController, private firebase: FirebaseService, private modalCtrl: ModalController, private router: Router ) {
    this.firebase.getList().subscribe( res => {
      console.log(res);
      this.list = res;
    })
  }
  async confirmation(index: number) {
    const alert = await this.alertController.create({
      header: 'Are You Sure You Want To Delete?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {

             
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', 
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
    });

    await alert.present();
  }

  async showErrorToast(data: any) {
    let toast = this.toastController.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
    (await toast).present();
  }

  

    async deleteList(todolist){
      const alert = await this.alertController.create({
        header: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.firebase.deleteList(todolist);
              console.log('deleted')
              this.showErrorToast('<ion-text color="danger"><b>Deleted</b></ion-text>');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', 
          }
        ],
      });
  
      await alert.present();
     
    }
   

     
}

