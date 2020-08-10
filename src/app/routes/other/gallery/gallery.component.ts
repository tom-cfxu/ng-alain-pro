import { _HttpClient } from '@delon/theme';
import { Component, OnInit } from '@angular/core';
import { GALLERY_CONF } from 'ngx-image-gallery';
import { deepCopy } from '@delon/util';

const ALL = 'All';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  list: any[];
  images: any[];
  types: string[];
  imagesLoaded = 0;
  masonryDisabled = true;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
  };

  constructor(private http: _HttpClient) {}

  ngOnInit() {
    this.http.get('/gallery').subscribe((res: any[]) => {
      this.types = [ALL].concat(
        ...Array.from(new Set(res.map(i => i.type as string))),
      );
      this.list = res;
      this.changeType(0);
    });
  }

  imgLoaded() {
    if (++this.imagesLoaded === this.images.length) {
      this.masonryDisabled = false;
    }
  }

  changeType(typeIdx: number) {
    const data = deepCopy(this.list);
    const type = this.types[typeIdx];
    this.imagesLoaded = 0;
    this.images = type === ALL ? data : data.filter(w => w.type === type);
  }
}
