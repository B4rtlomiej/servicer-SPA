import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from '../_models/note';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createNote(note: Note) {
    return this.http.post(this.baseUrl + 'notes', note);
  }

  deleteNote(noteId: number) {
    return this.http.delete(this.baseUrl + 'notes/' + noteId);
  }
}
