import { addPartials, getUserId, mapItems } from "../util.js";
import { getAll, createItem, getById, editItem, deleteById } from "../data.js";

export async function homePage() {
    await addPartials(this);

    if (this.app.userData === null)
        this.partial("./templates/catalog/homePage.hbs");
    else {
        const _posts = await getAll();
        const posts = _posts.map((p) => ({
            ...p,
            own: p._ownerId === this.app.userData.localId,
        }));
        console.log({ posts });

        const context = {
            posts,
            user: this.app.userData,
        };

        this.partials.items = await this.load("/templates/catalog/items.hbs");
        this.partials.singleItem = await this.load(
            "/templates/catalog/singleItem.hbs"
        );
        this.partials.createPost = await this.load(
            "/templates/catalog/createPost.hbs"
        );
        this.partials.createPage = await this.load(
            "/templates/catalog/createPage.hbs"
        );

        this.partial("./templates/catalog/homePage.hbs", context);
    }
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

    this.partial("/templates/catalog/detailsPage.hbs", context);
}
export async function editPost() {
    await addPartials(this);
    this.partials.editPost = await this.load("/templates/catalog/editPost.hbs");
    this.partials.editPage = await this.load("/templates/catalog/editPage.hbs");
    const item = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        item,
    };
    console.log(context);
    this.partial("/templates/catalog/editPage.hbs", context);
}
export async function editPage(ctx) {
    const { title, category, content } = ctx.params;
    try {
        if (title.length == 0 || category.length == 0 || content.length === 0) {
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
        const result = await deleteById(id);
        this.redirect("/home");
    } catch (err) {
        throw new Error(err);
    }
}
