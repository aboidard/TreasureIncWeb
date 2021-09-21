import Container from '@/components/Container'
import { getAllFiles } from '@/utils/files';

export default function BlogPage({ posts }) {
    return (
        <Container title="Blog">
            <p>{posts}</p>
        </Container>
    )
}

export async function getStaticProps() {
    const posts = await getAllFiles('blog');

    return { props: { posts } };
}
