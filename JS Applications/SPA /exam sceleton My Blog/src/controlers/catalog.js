import { addPartials, getUserId, mapItems } from "../util.js";
import { getAll, createItem, getById, editItem, deleteById } from "../data.js";

export async function homePage() {
    await addPartials(this);
    // --Тук не ми е янсно какв а е стойността на this.partials.item
    this.partials.item = await this.load("./templates/catalog/items.hbs");

    const data = await getAll();
    // const data = mapItems(await getAll());

    const context = data;
    context.user = this.app.userData;

    this.partial("./templates/catalog/homePage.hbs", context);
}
export async function createPost() {
    await addPartials(this);
    // -last insert 2row
    // this.partials.create = await this.load(
    //     "./templates/catalog/createPost.hbs"
    // );
    const context = {
        user: this.app.userData,
    };
    console.log(context);
    this.partial("./templates/catalog/createPage.hbs", context);
}
export async function createPage(ctx) {
    const { title, category, content } = ctx.params;
    try {
        if (title.length == 0 || category.length == 0 || content.length === 0) {
            throw new Error("All field are required!");
        } else {
            const result = await createItem({ title, category, content });
            ctx.app.userData = result;
            ctx.redirect("/home");
        }
    } catch (err) {
        console.log(err);
    }
}
export async function detailsPage() {
    await addPartials(this);
    const item = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        item,
        canEdit: item._ownerId == getUserId(),
        // likedCount: not iplemented yet
    };
    this.partial("templates/catalog/detailsPage.hbs", context);
}
export async function editPage() {
    await addPartials(this);
    const context = {
        user: this.app.userData,
        item,
    };
    const item = await getById(this.params.id);
    this.partial("/template/catalog/editPage.hbs", context);
}
export async function postEdit(ctx) {
    const { title, category, content } = ctx.params;
    try {
        if (title.length == 0 || category == 0 || content === 0) {
            throw new Error("All field are required!");
        } else {
            const result = await editItem(ctx.params.id, {
                title,
                category,
                content,
            });

            ctx.redirect("/home");
        }
    } catch (err) {
        console.log(err);
    }
}
export async function deleteItem() {
    try {
        const id = this.params.id;
        const result = deleteById(id);
        this.redirect("/home");
    } catch (err) {
        throw new Error(err);
    }
}
