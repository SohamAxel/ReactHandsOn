import './styles.css';

function App() {
  return (
      
    <form class="form">
    <div class="form-group error">
      <label class="label" for="email">Email</label>
      <input class="input" type="email" id="email" value="test@test.com" />
      <div class="msg">Must end in @webdevsimplified.com</div>
    </div>
    <div class="form-group">
      <label class="label" for="password">Password</label>
      <input
        class="input"
        value="Password123!"
        type="password"
        id="password"
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
  );
}

export default App;
