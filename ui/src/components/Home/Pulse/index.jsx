import Link from "next/link";

export default function Pulse() {
  return (
    <section className="pulse">
      <div className="pulse-inner con rv">
        <h2>
          YOUR BUSINESS.
          <br />
          MUMBAI96 PLATFORM.
          <br />
          COMPLETELY FREE.
        </h2>

        <p>
          No fees. No subscriptions. No catches. List your business on Mumbai's
          most complete
          <br />
          city platform and reach Mumbaikars exactly where they live.
        </p>

        <Link href="/auth/login" className="btn-pearl">
          Add Your Business Today
        </Link>
      </div>
    </section>
  );
}
