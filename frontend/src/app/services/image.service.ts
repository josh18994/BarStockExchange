import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CachedImage {
  url: string;
  blob: Blob;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private cacheUrls: string[] = [];
  private cachedImages: CachedImage[] = [];

  constructor(private http: HttpClient) { }

  set setCacheUrls(urls: string[]) {
    this.cacheUrls = [...urls];
  }
  get getCacheUrls(): string[] {
    return this.cacheUrls;
  }
  set setCachedImages(image: CachedImage) {
    this.cachedImages.push(image);
  }

  getImage(url: string): Observable<any> {
    const index = this.cachedImages.findIndex(image => image.url === url);
    if (index > -1) {
      const image = this.cachedImages[index];
      return of(URL.createObjectURL(image.blob));
    }
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap(blob => this.checkAndCacheImage(url, blob))
    );
  }

  checkAndCacheImage(url: string, blob: Blob) {
    if (this.cacheUrls.indexOf(url) > -1) {
      this.cachedImages.push({ url, blob });
    }
  }
}
