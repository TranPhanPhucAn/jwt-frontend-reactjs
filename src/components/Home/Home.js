import "./Home.scss";
const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to RM</h2>
      <p>
        RM is a comprehensive resource management application designed to help
        businesses and organizations effectively plan, allocate, and control
        their resources.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Resource Planning:</strong> RM allows users to create detailed
          resource plans, including financial resources, human resources,
          equipment, and materials.
        </li>
        <li>
          <strong>Allocation:</strong> Users can allocate resources to specific
          projects or tasks, ensuring that resources are utilized efficiently
          and effectively.
        </li>
        <li>
          <strong>Monitoring and Tracking:</strong> RM provides real-time
          monitoring and tracking of resource usage, allowing users to identify
          any deviations from the plan and take corrective actions.
        </li>
        <li>
          <strong>Collaboration:</strong> The app facilitates collaboration
          among team members by providing a centralized platform for sharing
          information, updates, and feedback related to resource management.
        </li>
        <li>
          <strong>Reporting:</strong> RM generates comprehensive reports and
          analytics on resource utilization, project progress, and overall
          performance, helping users make informed decisions and improve
          resource allocation strategies.
        </li>
      </ul>
    </div>
  );
};
export default Home;
