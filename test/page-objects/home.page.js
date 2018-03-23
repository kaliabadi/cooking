class HomePage {
  get contact() { return $('a[href="/contact"]'); }
  get recipeStore() { return $('a[href="/recipeStore"]'); }
  get login() { return $('a[href="/login"]')}

}
export default new HomePage();
