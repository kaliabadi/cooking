class HomePage {
  get contact() { return $('a[href="/contact"]'); }
  get recipeStore() { return $('a[href="/recipeStore"]'); }

}
export default new HomePage();
