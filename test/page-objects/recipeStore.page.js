class RecipeStore {

    get search() { return $('a[href="/"]'); }
    get contact() { return $('a[href="/contact"]'); }
    get login() { return $('a[href="/login"]'); }
    get register() { return $('a[href="/register"]'); }

}
export default new RecipeStore();
