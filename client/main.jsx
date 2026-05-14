import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { LoginForm } from "/imports/ui/LoginForm";
import { TasksPage } from "/imports/ui/TasksPage";
import { TasksEditPage } from "/imports/ui/TasksEditPage";
import "/imports/ui/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<App />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/edit" element={<TasksEditPage />} />
      </Routes>
    </BrowserRouter>,
  );
});
