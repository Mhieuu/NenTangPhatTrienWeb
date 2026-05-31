import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./components/ProductCard";
import TodoFilter from "./components/TodoFilter";
import TodoItem from "./components/TodoItem";

const tierList = [
  { id: "tier-0", short: "Tier 0", title: "Component đầu tiên" },
  { id: "tier-1", short: "Tier 1", title: "React Flow" },
  { id: "tier-2", short: "Tier 2", title: "JSX Variables" },
  { id: "tier-3", short: "Tier 3", title: "Component Split" },
  { id: "tier-4", short: "Tier 4", title: "useState Basics" },
  { id: "tier-5", short: "Tier 5", title: "Events Basics" },
  { id: "tier-6", short: "Tier 6", title: "Lists & CRUD" },
  { id: "tier-7", short: "Tier 7", title: "Todo App" },
];

const tierStats = [
  { value: "8", label: "tiers" },
  { value: "1", label: "app" },
  { value: "100%", label: "interactive" },
  { value: "v2", label: "curriculum" },
];

const tier2Products = [
  { name: "Laptop ThinkPad", price: 22990000 },
  { name: "Màn hình 27 inch", price: 5290000 },
  { name: "Bàn phím cơ", price: 1890000 },
  { name: "Tai nghe ANC", price: 3490000 },
];

const tier3Products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 24990000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    description: "Flagship gọn nhẹ cho người thích hệ sinh thái mượt mà.",
    tag: "Hot",
  },
  {
    id: 2,
    name: "Samsung S24",
    price: 21990000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    description: "Màn hình sáng, camera mạnh và nhiều tính năng thông minh.",
    tag: "New",
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 15990000,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
    description: "Hiệu năng cao trong mức giá dễ tiếp cận.",
    tag: "Value",
  },
];

const tier3People = [
  { name: "Minh", age: 20, role: "Sinh viên" },
  { name: "An", age: 21, role: "Frontend Intern" },
  { name: "Linh", age: 19, role: "UI Enthusiast" },
];

const tier6Seed = [
  { id: 1, name: "Nguyễn Văn Minh", age: 20, city: "Hà Nội" },
  { id: 2, name: "Trần Thu An", age: 21, city: "Đà Nẵng" },
  { id: 3, name: "Lê Kim Linh", age: 19, city: "TP.HCM" },
];

const initialTodos = [
  { id: 1, text: "Ôn JSX và component", done: true, createdAt: new Date().toISOString() },
  { id: 2, text: "Làm bài tập useState", done: false, createdAt: new Date().toISOString() },
  { id: 3, text: "Xây Todo App", done: false, createdAt: new Date().toISOString() },
];

function formatMoney(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function getGreetingByHour(hour) {
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function SectionCard({ title, description, children }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="section-card__body">{children}</div>
    </section>
  );
}

function DemoCard({ title, subtitle, children }) {
  return (
    <article className="demo-card">
      <div className="panel__title">
        <h4>{title}</h4>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      {children}
    </article>
  );
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function Tier0FirstComponent() {
  const person = {
    name: "Hiếu",
    role: "Sinh viên React",
    slogan: "JSX chỉ là HTML có não hơn một chút.",
  };

  const skills = ["HTML", "CSS", "JavaScript", "React"];

  return (
    <div className="tier-grid">
      <DemoCard title="Bài 0.1 - Component đầu tiên" subtitle="function + return JSX">
        <div className="panel">
          <div className="tier-mini__head">
            <div>
              <h4>{person.name}</h4>
              <p>{person.role}</p>
            </div>
            <Badge tone="good">React component</Badge>
          </div>
          <p>{person.slogan}</p>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </DemoCard>

      <DemoCard title="Bài 0.2 - JSX so với HTML" subtitle="className, htmlFor, self-closing">
        <div className="two-col">
          <div className="panel">
            <h4>UserProfile</h4>
            <div className="sample-grid">
              <div>
                <strong>Hồ sơ cá nhân</strong>
                <p>Minh - minh@example.com</p>
              </div>
              <div className="code-chip">className / htmlFor / &lt;img /&gt;</div>
            </div>
          </div>
          <div className="panel">
            <h4>ProductInfo</h4>
            <p>iPhone 15 - 25.000.000đ</p>
            <p>JSX cần đóng hết thẻ, kể cả img và input.</p>
          </div>
        </div>
      </DemoCard>
    </div>
  );
}

function BadCounterDemo() {
  let count = 0;

  function handleClick() {
    count += 1;
    console.log("Bad counter:", count);
  }

  return (
    <div className="counter-box">
      <h4>Counter thường</h4>
      <div className="count neutral">{count}</div>
      <p>Nhấn nút, console tăng nhưng giao diện không đổi.</p>
      <button type="button" className="secondary" onClick={handleClick}>
        Tăng (không update UI)
      </button>
    </div>
  );
}

function GoodCounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <h4>Counter đúng cách</h4>
      <div className="count good">{count}</div>
      <p>Gọi setState thì React render lại.</p>
      <div className="actions">
        <button type="button" className="primary" onClick={() => setCount((value) => value + 1)}>
          Tăng
        </button>
        <button type="button" className="secondary" onClick={() => setCount((value) => value - 1)}>
          Giảm
        </button>
        <button type="button" className="ghost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

function FlowStepper() {
  const [step, setStep] = useState(1);

  return (
    <div className="counter-box">
      <h4>Luồng render</h4>
      <div className="panel">
        <p className="mono">1. Component gọi function</p>
        <p className="mono">2. Return JSX</p>
        <p className="mono">3. setState → render lại</p>
      </div>
      <p className="count neutral">Bước {step}</p>
      <div className="actions">
        <button type="button" className="primary" onClick={() => setStep((value) => value + 1)}>
          Bước tiếp
        </button>
        <button type="button" className="secondary" onClick={() => setStep(1)}>
          Về đầu
        </button>
      </div>
      <div className="preview-box">
        {step === 1 && <p>Component vừa mount.</p>}
        {step === 2 && <p>User tương tác và state thay đổi.</p>}
        {step >= 3 && <p>React re-render và cập nhật UI.</p>}
      </div>
    </div>
  );
}

function Tier1ReactFlow() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="tier-grid">
      <DemoCard title="React render như thế nào?" subtitle={`Render lần #${renderCount.current}`}>
        <div className="panel">
          <p>
            React gọi component function, lấy JSX trả về, rồi cập nhật giao diện khi state đổi.
          </p>
          <Badge tone="warn">Mở console để thấy log render nếu bạn thêm console.log</Badge>
        </div>
      </DemoCard>

      <div className="tier-columns">
        <BadCounterDemo />
        <GoodCounterDemo />
      </div>

      <FlowStepper />
    </div>
  );
}

function Tier2JSXVariables() {
  const name = "Nguyễn Văn Minh";
  const age = 20;
  const hometown = "Hà Nội";
  const weight = 63;
  const height = 1.72;
  const bmi = weight / (height * height);
  const hour = new Date().getHours();
  const greeting = getGreetingByHour(hour);
  const isOnline = true;
  const stock = 0;
  const total = tier2Products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="tier-grid">
      <div className="two-col">
        <DemoCard title="Biến trong JSX" subtitle="{} để nhúng JavaScript">
          <div className="panel">
            <h4>{greeting}, {name}!</h4>
            <p>Tuổi: {age}</p>
            <p>Quê quán: {hometown}</p>
            <p>BMI: {bmi.toFixed(1)}</p>
            <Badge tone={isOnline ? "good" : "bad"}>{isOnline ? "Online" : "Offline"}</Badge>
          </div>
        </DemoCard>

        <DemoCard title="Conditional rendering" subtitle="ternary / &&">
          <div className="panel">
            <p>
              {stock > 0 ? (
                <span className="status-pill good">Còn hàng</span>
              ) : (
                <span className="status-pill bad">Hết hàng</span>
              )}
            </p>
            {isOnline && <p>Người dùng đang kết nối mạng.</p>}
            <p>Chào theo giờ hiện tại: {greeting}.</p>
          </div>
        </DemoCard>
      </div>

      <SectionCard title="Render danh sách và tính toán" description="map, key, reduce, tổng giá trị">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {tier2Products.map((product, index) => (
                <tr key={product.name}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{formatMoney(product.price)}</td>
                  <td>{product.price > 2000000 ? <span className="status-pill bad">Đắt</span> : <span className="status-pill good">Ổn</span>}</td>
                </tr>
              ))}
              <tr>
                <th colSpan="2">Tổng</th>
                <th>{formatMoney(total)}</th>
                <th>Computed value</th>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function GreetingCard({ name, age, role }) {
  return (
    <div className="panel">
      <h4>Xin chào {name}!</h4>
      <p>Tuổi: {age}</p>
      <p>Vai trò: {role}</p>
    </div>
  );
}

function Tier3ComponentSplit() {
  return (
    <div className="tier-grid">
      <SectionCard
        title="Chia component để tái sử dụng"
        description="Một giao diện lớn nên được ghép từ những component nhỏ, rõ vai trò."
      >
        <div className="tier-grid">
          <div className="sample-grid sample-grid--2">
            {tier3People.map((person) => (
              <GreetingCard key={person.name} {...person} />
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="ProductCard ở file riêng" description="Props truyền dữ liệu từ cha xuống con.">
        <div className="product-grid">
          {tier3Products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Header + Content + Footer" description="Trang web = nhiều component ghép lại.">
        <div className="panel">
          <div className="tier-mini__head">
            <h4>React Store</h4>
            <Badge tone="good">Header</Badge>
          </div>
          <p>Component nhỏ giúp code dễ đọc, dễ test, dễ thay đổi.</p>
          <div className="actions">
            <button type="button" className="secondary">
              Trang chủ
            </button>
            <button type="button" className="secondary">
              Giới thiệu
            </button>
          </div>
          <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "16px 0" }} />
          <p>Footer © 2026 - Tách rõ trách nhiệm.</p>
        </div>
      </SectionCard>
    </div>
  );
}

function NumberStateLab() {
  const [count, setCount] = useState(0);

  const tone = count > 0 ? "good" : count < 0 ? "bad" : "neutral";
  const label = count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Bằng 0";

  return (
    <div className="counter-box">
      <h4>Counter số</h4>
      <div className={`count ${tone}`}>{count}</div>
      <Badge tone={tone === "neutral" ? "warn" : tone}>{label}</Badge>
      <div className="actions">
        <button type="button" className="primary" onClick={() => setCount((value) => value + 1)}>
          +1
        </button>
        <button type="button" className="secondary" onClick={() => setCount((value) => value - 1)}>
          -1
        </button>
        <button type="button" className="secondary" onClick={() => setCount((value) => value + 5)}>
          +5
        </button>
        <button type="button" className="ghost" onClick={() => setCount((value) => value * 2)}>
          X2
        </button>
        <button type="button" className="ghost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

function StringStateLab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const hasValidEmail = email.includes("@");

  return (
    <div className="counter-box">
      <h4>State chuỗi</h4>
      <div className="field">
        <label>Tên</label>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nhập tên..." />
      </div>
      <div className="field">
        <label>Email</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Nhập email..." />
      </div>
      <div className="field">
        <label>Mật khẩu</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Nhập mật khẩu..."
        />
      </div>
      <div className="actions">
        <button type="button" className="secondary" onClick={() => setShowPassword((value) => !value)}>
          {showPassword ? "Ẩn" : "Hiện"} mật khẩu
        </button>
      </div>
      <div className="preview-box">
        <p>Tên: {name || "(chưa nhập)"}</p>
        <p>Email: {email || "(chưa nhập)"}</p>
        <p>Ký tự tên: {name.length}/100</p>
        <p>{hasValidEmail ? <span className="status-pill good">Email hợp lệ</span> : <span className="status-pill bad">Email chưa hợp lệ</span>}</p>
        {name ? <p>Xin chào <strong>{name}</strong>!</p> : null}
      </div>
    </div>
  );
}

function ToggleStateLab() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="counter-box" style={{ background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)" }}>
      <h4>Boolean & toggle</h4>
      <div className="toggle-row">
        <button type="button" className="primary" onClick={() => setIsVisible((value) => !value)}>
          {isVisible ? "Ẩn" : "Hiện"} nội dung
        </button>
        <button type="button" className="secondary" onClick={() => setIsDarkMode((value) => !value)}>
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button type="button" className="ghost" onClick={() => setIsLiked((value) => !value)}>
          {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
        </button>
      </div>
      {isVisible && (
        <div className="preview-box">
          <p>Nội dung có thể ẩn / hiện bằng state boolean.</p>
        </div>
      )}
      <div className="preview-box">
        <button type="button" className="ghost" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? "Đóng" : "Mở"} accordion
        </button>
        {isOpen && <p style={{ marginTop: 12 }}>Accordion mở ra khi click tiêu đề.</p>}
      </div>
    </div>
  );
}

function Tier4UseStateBasics() {
  return (
    <div className="tier-grid">
      <div className="tier-columns">
        <NumberStateLab />
        <StringStateLab />
      </div>
      <ToggleStateLab />
    </div>
  );
}

function ClickEventsLab() {
  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [boxColor, setBoxColor] = useState("#8bd3ff");
  const [liked, setLiked] = useState(false);

  function randomColor() {
    const palette = ["#8bd3ff", "#ffb86b", "#67e8a5", "#c2a6ff", "#ff7d90"];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  return (
    <div className="counter-box">
      <h4>Click events</h4>
      <div className="preview-box" style={{ background: boxColor }}>
        <strong style={{ color: "#08101d" }}>Màu nền thay đổi ngẫu nhiên</strong>
      </div>
      <div className="actions">
        <button type="button" className="primary" onClick={() => setBoxColor(randomColor())}>
          Đổi màu
        </button>
        <button type="button" className="secondary" onClick={() => setLeftClicks((value) => value + 1)}>
          Nút A ({leftClicks})
        </button>
        <button type="button" className="secondary" onClick={() => setRightClicks((value) => value + 1)}>
          Nút B ({rightClicks})
        </button>
        <button type="button" className="ghost" onClick={() => setLiked((value) => !value)}>
          {liked ? "❤️" : "🤍"} Like
        </button>
      </div>
    </div>
  );
}

function InputEventsLab() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characterCount = text.length;

  return (
    <div className="counter-box">
      <h4>Input events</h4>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Nhập gì đó..."
      />
      <p>Ký tự: {characterCount}/100</p>
      <p>Số từ: {words}</p>
      {text && (
        <div className="preview-box">
          <p>
            Preview: <strong>{text}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

function KeyboardEventsLab() {
  const [lastKey, setLastKey] = useState("");
  const [pressedKeys, setPressedKeys] = useState([]);
  const [targetKey, setTargetKey] = useState("k");
  const [message, setMessage] = useState("Nhấn phím mũi tên để di chuyển ô vuông.");
  const [position, setPosition] = useState({ x: 72, y: 72 });
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const boxRef = useRef(null);

  function handleKeyDown(event) {
    setLastKey(event.key);
    setPressedKeys((current) => [event.key, ...current].slice(0, 5));

    if (event.ctrlKey && event.key.toLowerCase() === "d") {
      event.preventDefault();
      setIsDarkBackground((value) => !value);
      setMessage("Ctrl + D đã đổi màu nền.");
      return;
    }

    if (event.key === targetKey) {
      setMessage(`Đúng rồi, bạn vừa nhấn ${targetKey}.`);
      setTargetKey(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
    }

    setPosition((current) => {
      const next = { ...current };
      if (event.key === "ArrowUp") next.y = Math.max(0, current.y - 18);
      if (event.key === "ArrowDown") next.y = Math.min(160, current.y + 18);
      if (event.key === "ArrowLeft") next.x = Math.max(0, current.x - 18);
      if (event.key === "ArrowRight") next.x = Math.min(320, current.x + 18);
      return next;
    });
  }

  useEffect(() => {
    const element = boxRef.current;
    if (element) {
      element.focus();
    }
  }, []);

  return (
    <div className="counter-box">
      <h4>Keyboard events</h4>
      <div
        ref={boxRef}
        className="keyboard-box"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ background: isDarkBackground ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)" }}
      >
        <div className="mover" style={{ left: position.x, top: position.y }} />
        <p>{message}</p>
        <p>Phím cuối: {lastKey || "chưa nhấn"}</p>
        <p>Game đoán phím: hãy nhấn <strong>{targetKey.toUpperCase()}</strong></p>
        <p>5 phím gần nhất: {pressedKeys.join(" → ") || "-"}</p>
      </div>
    </div>
  );
}

function FormEventsLab() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email) {
      alert("Vui lòng nhập tên và email.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="counter-box">
      <h4>Form events</h4>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field">
          <label>Tên</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>Tin nhắn</label>
          <textarea name="message" value={form.message} onChange={handleChange} />
        </div>
        <div className="actions" style={{ gridColumn: "1 / -1" }}>
          <button type="submit" className="primary">
            Gửi form
          </button>
          <button type="button" className="ghost" onClick={() => setForm({ name: "", email: "", message: "" })}>
            Reset
          </button>
        </div>
      </form>
      <div className="preview-box">
        <p>{submitted ? "Form đã submit thành công." : "Điền form và nhấn gửi."}</p>
        <p>Tên: {form.name || "-"}</p>
        <p>Email: {form.email || "-"}</p>
      </div>
    </div>
  );
}

function Tier5EventsBasics() {
  return (
    <div className="tier-grid">
      <div className="tier-columns">
        <ClickEventsLab />
        <InputEventsLab />
      </div>
      <div className="tier-columns">
        <KeyboardEventsLab />
        <FormEventsLab />
      </div>
    </div>
  );
}

function CrudLab() {
  const [items, setItems] = useState(tier6Seed);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingItem, setEditingItem] = useState({ name: "", age: "", city: "" });
  const [lastDeleted, setLastDeleted] = useState(null);

  const averageAge = items.length ? (items.reduce((sum, item) => sum + Number(item.age), 0) / items.length).toFixed(1) : 0;

  function resetForm() {
    setName("");
    setAge("");
    setCity("");
  }

  function addItem() {
    if (!name.trim() || !age.trim() || !city.trim()) {
      alert("Hãy nhập đủ tên, tuổi và quê quán.");
      return;
    }

    setItems((current) => [
      ...current,
      { id: Date.now(), name: name.trim(), age: Number(age), city: city.trim() },
    ]);
    resetForm();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditingItem({ name: item.name, age: String(item.age), city: item.city });
  }

  function saveEdit() {
    setItems((current) =>
      current.map((item) =>
        item.id === editingId
          ? { ...item, name: editingItem.name.trim(), age: Number(editingItem.age), city: editingItem.city.trim() }
          : item,
      ),
    );
    setEditingId(null);
  }

  function deleteItem(id) {
    const target = items.find((item) => item.id === id);
    if (!window.confirm(`Xóa ${target.name}?`)) {
      return;
    }
    setLastDeleted(target);
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function undoDelete() {
    if (!lastDeleted) return;
    setItems((current) => [...current, lastDeleted].sort((a, b) => a.id - b.id));
    setLastDeleted(null);
  }

  function clearAll() {
    if (window.confirm("Xóa tất cả sinh viên?")) {
      setItems([]);
      setLastDeleted(null);
    }
  }

  return (
    <div className="tier-grid">
      <SectionCard title="CRUD list" description="Create, Read, Update, Delete với mảng object trong state.">
        <div className="panel">
          <div className="form-grid">
            <div className="field">
              <label>Tên</label>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nhập tên" />
            </div>
            <div className="field">
              <label>Tuổi</label>
              <input value={age} onChange={(event) => setAge(event.target.value)} placeholder="Nhập tuổi" />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Quê quán</label>
              <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Nhập quê quán" />
            </div>
          </div>
          <div className="actions" style={{ marginTop: 14 }}>
            <button type="button" className="primary" onClick={addItem}>
              Thêm sinh viên
            </button>
            <button type="button" className="ghost" onClick={clearAll}>
              Xóa tất cả
            </button>
            {lastDeleted ? (
              <button type="button" className="secondary" onClick={undoDelete}>
                Hoàn tác xóa
              </button>
            ) : null}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Danh sách hiện tại" description={`Số lượng: ${items.length} | Tuổi trung bình: ${averageAge}`}>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Tuổi</th>
                <th>Quê quán</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        value={editingItem.name}
                        onChange={(event) => setEditingItem((current) => ({ ...current, name: event.target.value }))}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        value={editingItem.age}
                        onChange={(event) => setEditingItem((current) => ({ ...current, age: event.target.value }))}
                      />
                    ) : (
                      item.age
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        value={editingItem.city}
                        onChange={(event) => setEditingItem((current) => ({ ...current, city: event.target.value }))}
                      />
                    ) : (
                      item.city
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {editingId === item.id ? (
                        <button type="button" className="primary" onClick={saveEdit}>
                          Lưu
                        </button>
                      ) : (
                        <button type="button" className="secondary" onClick={() => startEdit(item)}>
                          Sửa
                        </button>
                      )}
                      <button type="button" className="danger" onClick={() => deleteItem(item.id)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function Tier6ListsCrud() {
  return <CrudLab />;
}

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem("exercises-v2-todos");
      return stored ? JSON.parse(stored) : initialTodos;
    } catch {
      return initialTodos;
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("exercises-v2-todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    const todo = {
      id: Date.now(),
      text,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((current) => [...current, todo]);
    setInputValue("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.done));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.done).length;
  const completedCount = todos.filter((todo) => todo.done).length;
  const completionRate = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="tier-grid">
      <SectionCard title="Todo App" description="Add, toggle, delete, filter, đếm số việc và lưu localStorage.">
        <div className="todo-hero">
          <div>
            <span className="code-chip">Tier 7 · Mini project</span>
            <h3>Todo App trực quan, gọn và dễ thao tác</h3>
            <p>
              Quản lý công việc theo kiểu dashboard: nhập nhanh, lọc rõ, theo dõi tiến độ và giữ dữ liệu qua reload.
            </p>
          </div>

          <div className="todo-hero__stats">
            <div className="todo-stat">
              <strong>{todos.length}</strong>
              <span>Tổng todo</span>
            </div>
            <div className="todo-stat">
              <strong>{activeCount}</strong>
              <span>Chưa xong</span>
            </div>
            <div className="todo-stat">
              <strong>{completedCount}</strong>
              <span>Hoàn thành</span>
            </div>
            <div className="todo-stat">
              <strong>{completionRate}%</strong>
              <span>Tỷ lệ xong</span>
            </div>
          </div>
        </div>

        <div className="todo-shell">
          <div className="todo-composer">
            <div className="todo-composer__input">
              <label className="helper-text">Nhập công việc mới</label>
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ví dụ: Hoàn thành bài Tier 7..."
              />
            </div>
            <div className="actions todo-composer__actions">
              <button type="button" className="primary" onClick={addTodo}>
                Thêm todo
              </button>
              <button type="button" className="ghost" onClick={clearCompleted}>
                Dọn việc xong
              </button>
            </div>
          </div>

          <TodoFilter filter={filter} setFilter={setFilter} />

          <div className="todo-layout">
            <div className="todo-list-panel">
              {filteredTodos.length === 0 ? (
                <div className="todo-empty">
                  <div className="todo-empty__icon">☕</div>
                  <h4>Chưa có công việc phù hợp</h4>
                  <p>
                    Thử đổi bộ lọc hoặc thêm một todo mới để bắt đầu danh sách.
                  </p>
                </div>
              ) : (
                <ul className="todo-list">
                  {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                  ))}
                </ul>
              )}
            </div>

            <aside className="todo-sidebar">
              <div className="todo-summary-card">
                <h4>Trạng thái hiện tại</h4>
                <div className="todo-summary-card__row">
                  <span>Đang lọc</span>
                  <strong>{filter === "all" ? "Tất cả" : filter === "active" ? "Chưa xong" : "Hoàn thành"}</strong>
                </div>
                <div className="todo-summary-card__row">
                  <span>Tiến độ</span>
                  <strong>{completionRate}%</strong>
                </div>
                <div className="todo-summary-card__row">
                  <span>Lưu cục bộ</span>
                  <strong>localStorage</strong>
                </div>
              </div>

              <div className="todo-summary-card todo-summary-card--soft">
                <h4>Checklist nhanh</h4>
                <ul>
                  <li>Nhấn Enter để thêm nhanh.</li>
                  <li>Click checkbox để toggle done.</li>
                  <li>Filter giúp tập trung theo trạng thái.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

const tierViews = {
  "tier-0": {
    title: "Tier 0 - Component đầu tiên",
    description: "Viết component đầu tiên, làm quen JSX và cú pháp React cơ bản.",
    element: <Tier0FirstComponent />,
  },
  "tier-1": {
    title: "Tier 1 - Hiểu luồng hoạt động",
    description: "Render, re-render và vì sao setState làm UI cập nhật.",
    element: <Tier1ReactFlow />,
  },
  "tier-2": {
    title: "Tier 2 - Biến trong JSX",
    description: "Nhúng biến, condition, list rendering và tính toán ngay trong giao diện.",
    element: <Tier2JSXVariables />,
  },
  "tier-3": {
    title: "Tier 3 - Chia component",
    description: "Tách UI thành component nhỏ, truyền dữ liệu bằng props.",
    element: <Tier3ComponentSplit />,
  },
  "tier-4": {
    title: "Tier 4 - useState basics",
    description: "Làm chủ state số, chuỗi và boolean.",
    element: <Tier4UseStateBasics />,
  },
  "tier-5": {
    title: "Tier 5 - Events basics",
    description: "Click, input, keyboard và form events.",
    element: <Tier5EventsBasics />,
  },
  "tier-6": {
    title: "Tier 6 - Lists & CRUD",
    description: "Quản lý mảng object với create, read, update và delete.",
    element: <Tier6ListsCrud />,
  },
  "tier-7": {
    title: "Tier 7 - Todo App",
    description: "Mini project tổng hợp toàn bộ kiến thức React cơ bản.",
    element: <TodoApp />,
  },
};

function App() {
  const [activeTier, setActiveTier] = useState("tier-0");
  const currentTier = tierViews[activeTier];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__mark">R</div>
          <div>
            <h1>React Basics v2</h1>
            <p>Complete tier solution</p>
          </div>
        </div>

        <nav className="tier-nav">
          {tierList.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={activeTier === tier.id ? "active" : ""}
              onClick={() => setActiveTier(tier.id)}
            >
              <strong>{tier.short}</strong>
              <br />
              <span>{tier.title}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__note">
          Chọn một tier để xem demo tương ứng. Mỗi khối bên phải đã được làm theo yêu cầu của tài liệu v2.
        </div>
      </aside>

      <main className="main">
        <header className="hero">
          <div className="hero__top">
            <div>
              <h2>{currentTier.title}</h2>
              <p>{currentTier.description}</p>
            </div>
            <div className="hero__stats">
              {tierStats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="content">
          <SectionCard
            title="Cách dùng"
            description="Mỗi tier là một demo riêng, có thể click ở sidebar để đổi bài."
          >
            <div className="panel">
              <p>
                Đây là bản React chạy được để mô phỏng và hoàn thành các yêu cầu trong bộ <strong>exercises_v2</strong>.
              </p>
              <p>
                Tier 0 đến Tier 7 đều được triển khai trực tiếp, gồm component, JSX, props, state, events, CRUD và Todo App.
              </p>
            </div>
          </SectionCard>

          {currentTier.element}
        </div>
      </main>
    </div>
  );
}

export default App;
