# **Droplo test task**

A droplo test task is a drag-and-drop menu management application, providing the ability to create, edit, and rearrange nested menu items. The application has been implemented in accordance with the provided [Figma design](https://www.figma.com/design/iop6JTlGuNSwGtHtkyXF9x/Zadanie-rekrutacyjne?node-id=1-12453&node-type=frame&t=DSEengCj0dlrTLOz-0).

## Installation

Follow these steps to run the application locally:

1. Clone the repository:

```bash
git clone https://github.com/Lmenkovaa/droplo_task.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Build the project:

```bash
npm run build
```

5. Start the project:

```bash
npm start
```

6. Test the application:

```bash
npm test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## **Structure**

1. **app/**: Contains global configurations, layouts, and the main entry point for the app.
   - **SSR Disabled**: Server-side rendering is disabled because all data is stored in `localStorage`. There is no need for server-side data fetching.
2. **components/**:
   - **buttons/**: Contains reusable button components.
   - **menu/**: Holds all components related to menu management, including drag-and-drop, forms, and nested structures.
3. **data/**: Contains the default menu structure.
4. **hooks/**:
   - **useMenuItems.js**: Includes custom React hooks to encapsulate reusable state management logic with localStorage.
5. **utils/**:
   - **menuUtils.js**: A collection of utility functions for handling menu-related operations.
   - \***\*test**/\*\*: Contains unit tests to ensure utility functions work as expected.

## **Technologies**

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive and utility-first styling.
- **Drag & Drop**: [dnd-kit](https://dndkit.com/) for implementing drag-and-drop functionality.
- **Forms and Validation**: [React Hook Form](https://react-hook-form.com/) and Yup for form handling and validation.
- **State Management**: `localStorage` for persisting menu data.
- **Testing**: [Jest](https://jestjs.io/) for unit and integration testing.

## **Contact**

If you have any questions, please contact **[Lizaveta Miankova](mailto:miankovadev@gmail.com)**.
