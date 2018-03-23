class HomePage {
    get contact() { return $('a[href="/contact"]'); }
    get recipeStore() { return $('a[href="/recipeStore"]'); }
    get register() { return $('a[href="/register"]'); }

}
export default new HomePage();