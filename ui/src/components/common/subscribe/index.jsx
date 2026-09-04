"use client";

import { useToast } from "@/context/toast/toast-provider";

const Subscriber = () => {
  const { addToast } = useToast();

  const saveSubscribe = async (e) => {
    const form = e.target;
    const email = form.email.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        addToast(data.message, "success");
        form.reset();
      } else {
        addToast(data.error, "error");
      }
    } catch (err) {
      addToast("Network error. Try again.", "error");
    }
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        saveSubscribe(e);
      }}
    >
      <input
        name="email"
        className="nlw-input"
        type="email"
        placeholder="your@email.com"
        required
      />

      <button className="nlw-btn">Subscribe Free →</button>
    </form>
  );
};

export default Subscriber;
