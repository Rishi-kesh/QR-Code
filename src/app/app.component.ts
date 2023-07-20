import { Component, ViewChild } from '@angular/core';
import { FixMeLater, QRCodeElementType } from 'angularx-qrcode';
import { Options } from 'ngx-qrcode-styling';
import { NgxQrcodeStylingComponent } from 'ngx-qrcode-styling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qrCode';
  green = '#d5c32c'
  public config: Options = {
    width: 300,
    height: 300,
    data: "https://devfinity.bizvue.io/time-entry-new",
    margin: 5,
    dotsOptions: {
      color: "#1977f3",
      type: "dots"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0
    },
    qrOptions: {
      errorCorrectionLevel: 'H'
  }
  };
  public configs: Options = {
    width: 300,
    height: 300,
    data: "https://devfinity.bizvue.io/time-entry-new",
    margin: 5,
    dotsOptions: {
      color: "#c7271c",
      type: "dots"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0
    },
    qrOptions: {
      errorCorrectionLevel: 'H'
  }
  };
  public configss: Options = {
    width: 300,
    height: 300,
    data: "https://devfinity.bizvue.io/time-entry-new",
    margin: 5,
    dotsOptions: {
      color: "#c7271c",
      type: "dots"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0
    },
    qrOptions: {
      errorCorrectionLevel: 'H'
  }
  };
  public elementType: QRCodeElementType = 'canvas';
  @ViewChild('parent') qrcodeComponent!: NgxQrcodeStylingComponent;

  saveAsImage(parent: FixMeLater) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "angularx-qrcode"
      link.click()
    }
  }


  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  
}
