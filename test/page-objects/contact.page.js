class Contact {
  
  get login() { return $('a[href="/login"]'); }
  get recipeStore() { return $('a[href="/recipeStore"]'); }
  get register() { return $('a[href="/register"]'); }
  get search() { return $('a[href="/"]'); }

}
export default new Contact();
