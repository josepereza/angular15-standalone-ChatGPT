import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './interfaces/api.interface';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MarkdownPipe } from 'src/app/shared/markdown.pipe';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MarkdownPipe],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  chatCompletion$!: Observable<Message>;

  private readonly apiSvc = inject(ApiService);
  name = new FormControl('');
  
  constructor() {
  }
  pregunta(){
    this.chatCompletion$=this.apiSvc.generateResponse(this.name.value!)      
  }
}
