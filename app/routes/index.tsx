import { Link } from 'remix';

const Index = () => {
  return (
    <main>
      <form method="post">
        <h2>Subscribe!</h2>
        <p>Don't miss any of the action!</p>
        <fieldset>
          <input
            aria-label="Email address"
            aria-describedby="error-message"
            type="email"
            name="email"
            placeholder="you@example.com"
          />
          <button type="submit">Subscribe</button>
        </fieldset>

        <p id="error-message" />
      </form>

      <div style={{ display: 'none' }}>
        <h2>You're subscribed!</h2>
        <p>Please check your email to confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  );
};

export default Index;
