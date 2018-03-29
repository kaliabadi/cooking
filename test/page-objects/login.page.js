class Login {
  get contact() { return $('a[href="/contact"]'); }
  get recipeStore() { return $('a[href="/recipeStore"]'); }
  get register() { return $('a[href="/register"]'); }
  get search() { return $('a[href="/"]'); }

}
export default new Login();
