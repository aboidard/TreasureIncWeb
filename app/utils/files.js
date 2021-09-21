import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

export async function getFiles(type) {
    return readdirSync(join(process.cwd(), 'data', type));
}

export async function getAllFiles(type) {
    const files = readdirSync(join(process.cwd(), 'data', type));

    return files.reduce((allPosts, postName) => {
        const source = readFileSync(
            join(process.cwd(), 'data', type, postName),
            'utf8'
        );
        const { data } = matter(source);

        return [
            {
                ...data,
            },
            ...allPosts
        ];
    }, []);
}