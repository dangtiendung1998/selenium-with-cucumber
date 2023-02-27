class Navigation{
    constructor(navigation) {
        this.navigation = navigation
    }

    async to(url) {
        return await this.navigation.to(url);
    }

    async back() {
        return await this.navigation.navigate().back()
    }

    async forward() {
        return await this.navigation.navigate().forward()
    }

    async refresh() {
        return await this.navigation.navigate().refresh()
    }
}
module.exports = {Navigation}
