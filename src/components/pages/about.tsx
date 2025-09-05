function About() {
  return (
    <>
      <h1 className="text-3xl font-bold my-6">About TheAimer</h1>
      <hr className="my-4" />
      <section className="my-4 text-lg leading-8 text-muted-foreground ">
        <p className="my-4 text-lg">
          Aimer is a blogging platform built with React and TypeScript. It
          allows users to create, read, update, and delete blog posts. The
          platform is designed to be simple and user-friendly, making it easy
          for anyone to share their thoughts and ideas with the world.
        </p>
        <p className="my-4 text-lg">Key features of Aimer include:</p>
        <ul className="list-disc list-inside my-4 text-lg">
          <li>Create and manage blog posts</li>
          <li>Responsive design for optimal viewing on all devices</li>
          <li>Easy navigation with a clean and intuitive interface</li>
          <li>Support for rich text formatting and media embedding</li>
        </ul>
        <p className="my-4 text-lg">
          Whether you're a seasoned blogger or just getting started, Aimer
          provides the tools you need to express yourself and connect with your
          audience. Start your blogging journey with Aimer today!
        </p>
      </section>
    </>
  );
}

export default About;
