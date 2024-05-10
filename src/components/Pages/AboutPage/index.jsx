import useUpdateHead from "../../../hooks/useUpdateHead";

export default function AboutPage() {
  useUpdateHead("About", "Learn more about Holidaze and our mission");

  return (
    <main className="flex flex-col gap-8 px-5 max-w-lg">
      <div>
        <h1>Welcome</h1>
        <p className="text-primary font-heading font-bold text-lg">to the story about Holidaze</p>
      </div>

      <article className="flex flex-col gap-5">
        <p>At Holidaze, we believe that finding the perfect getaway shouldn`t be a chore, it should be the beginning of an adventure.</p>

        <p>
          Our mission is to connect travelers with the ideal accommodations to make each trip unforgettable, whether it's a cozy weekend at a bed and breakfast, a luxurious stay at a boutique hotel,
          or a nice vacation in a furnished home.
        </p>

        <p>We are dedicated to ensuring that each listing on our platform meets our high standards of comfort and quality.</p>

        <p>Our carefully curated properties ensure that every traveler finds a place that feels like home, no matter where their journey takes them.</p>

        <p>Thank you for choosing Holidaze. Where your next adventure begins!</p>
      </article>
    </main>
  );
}
