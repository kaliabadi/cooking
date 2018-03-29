class HomePage {

    get contact() { return $('a[href="/contact"]'); }
    get recipeStore() { return $('a[href="/recipeStore"]'); }
    get login() { return $('a[href="/login"]'); }
    get register() { return $('a[href="/register"]'); }

}
export default new HomePage();