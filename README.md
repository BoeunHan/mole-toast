# mole-toast

Lightweight toast notification library for React

<br/>

## Features

- Simple toast API
- Supports multiple toast types and durations

<br/>

## Demo

### Live Preview

![Mole Toast Demo](https://github.com/user-attachments/assets/fdcdd210-fabf-47fe-8d19-e91783755e9a)

### Toast Types

| Type    | Preview                                                                                     |
| ------- | ------------------------------------------------------------------------------------------- |
| Success | ![Success](https://github.com/user-attachments/assets/896ea5e5-c50b-4a76-9d88-4bc9dd369599) |
| Error   | ![Error](https://github.com/user-attachments/assets/3c76bf7d-9731-41af-a5e2-6ce7e7e6cbe6)   |
| Info    | ![Info](https://github.com/user-attachments/assets/750b6e84-8b8f-40e0-b878-f3b9b07bb189)    |
| Warning | ![Warning](https://github.com/user-attachments/assets/f25a1a90-caca-4a2f-84e6-0e92b2b31c4b) |

<br/>

## Installation

```bash
npm install mole-toast
# or
yarn add mole-toast
```

<br/>

## Usage

Import `ToastManager` to root layout

```typescript
import { ToastManager } from "mole-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ToastManager />
      </body>
    </html>
  );
}
```

Use the toast hook like this:

```typescript
import React from "react";
import { useToast, ToastManager } from "mole-toast";

function App() {
  const toast = useToast();

  return (
    <button onClick={() => toast.shortSuccess("This is a success message!")}>
      Show Success Toast
    </button>
  );
}

export default App;
```

<br/>

## Toast API

- `longSuccess(message: string)`
- `longError(message: string)`
- `longInfo(message: string)`
- `longWarning(message: string)`
- `shortSuccess(message: string)`
- `shortError(message: string)`
- `shortInfo(message: string)`
- `shortWarning(message: string)`
- `clear()` - clear all toasts in state

<br/>

## Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

> React (>=17)

<br/>

## License

MIT © Boeun Han
