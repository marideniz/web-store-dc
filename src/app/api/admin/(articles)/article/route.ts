import {NextRequest, NextResponse} from "next/server";
import {currentUser} from "@/lib/auth";
import User from "@/models/userModel";
import Article from "@/models/articleModel";
import ArticleCategory from "@/models/articleCategoryModel";
import {connect} from "@/db/db";

connect();
export const maxDuration = 59;

export async function POST(request: NextRequest) {
    try {

        const user = await currentUser();

        if(!user){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        const userDB = await User.findById(user.id)

        if(!userDB){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        if(user?.isAdmin === false){
            return NextResponse.json({error: "Forbidden. You don't have administrator rights."}, {status: 403})
        }

        const reqBody = await request.json()
        const {title, categories, backgroundImage, description, keywords, content, likes, comments, views, coAuthors, createdAt} = reqBody

        for (const category of categories) {
            const categoryCandidate = await ArticleCategory.findOne({name: category.name});
            if(!categoryCandidate){
                return NextResponse.json({error: "Категории не существует"}, {status: 200})
            }
            categoryCandidate.numberOfArticles = categoryCandidate.numberOfArticles + 1;
            await categoryCandidate.save();
        }

        const newArticle = new Article({title, categories, backgroundImage, description, keywords, content, likes, comments, views, coAuthors, createdAt});
        const savedArticle = await newArticle.save()
        return NextResponse.json({
            message: "Article created successfully",
            article: savedArticle
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if(!user){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }
        const userDB = await User.findById(user.id)

        if(!userDB){
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }

        if(user?.isAdmin === false){
            return NextResponse.json({error: "Forbidden. You don't have administrator rights."}, {status: 403})
        }

        const allArticles = await Article.find({}).select('-content');
        // @ts-ignore
        const sortedArticles = allArticles.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

        return NextResponse.json({
            message: "All allArticles retrieved successfully",
            article: sortedArticles
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}