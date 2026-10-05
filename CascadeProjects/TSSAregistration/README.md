# TSSA Registration Portal

A comprehensive player registration system for TSSA (Tennis/Sports Association) built with Spring Boot and Java.

## Features

- **Player Registration**: Complete registration form with all required player information
- **Age Categories**: Players are categorized into:
  - Under 10
  - Under 12-14
  - Under 15-16
  - Under 17
  - Under 18
- **Document Upload**: Support for uploading transcripts, passport photos, and other documents
- **Signature Capture**: Digital signature capture for both players and parents/guardians
- **Player Information**:
  - First name and last name
  - Date of birth
  - National Identification Number (NIN)
  - Address
  - Position
  - Locker number
  - Hobbies
- **Educational History**: Track schools attended
- **Work Experience**: Track companies worked at
- **Coach Management**: Add and view coaches with specializations
- **President Hierarchy**: Manage organizational hierarchy with hierarchy levels
- **Color Theme**: Blue, yellow, and orange color palette throughout the application

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Thymeleaf** (Server-side templating)
- **H2 Database** (In-memory database for development)
- **Maven** (Build tool)

## Prerequisites

- Java Development Kit (JDK) 17 or higher
- Maven 3.6 or higher
- A modern web browser

## Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd TSSAregistration
   ```

3. **Build the project using Maven**:
   ```bash
   mvn clean install
   ```

4. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

   Alternatively, you can run the JAR file after building:
   ```bash
   java -jar target/registration-1.0.0.jar
   ```

## Accessing the Application

Once the application starts, open your web browser and navigate to:

```
http://localhost:8080
```

This will redirect you to the registration page.

## Application Pages

- **Registration Page** (`/registration`): Main player registration form
- **Success Page** (`/success`): Confirmation page after successful registration
- **Players List** (`/players`): View all registered players
- **Player Details** (`/players/{id}`): View detailed information about a specific player
- **Coaches** (`/coaches`): View and manage coaches
- **Add Coach** (`/coaches/add`): Add a new coach to the system
- **Presidents** (`/presidents`): View president hierarchy
- **Add President** (`/presidents/add`): Add a new president to the hierarchy

## Database Configuration

The application uses an in-memory H2 database by default. The database schema is automatically created on application startup.

To access the H2 console (for development/debugging):
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tssadb`
- Username: `sa`
- Password: (leave empty)

## File Upload Configuration

The application supports file uploads with the following limits:
- Maximum file size: 10MB per file
- Supported formats: PDF, DOC, DOCX, JPG, PNG

Files are stored as Base64 encoded strings in the database for simplicity in this demo version.

## Project Structure

```
TSSAregistration/
├── src/
│   ├── main/
│   │   ├── java/com/tssa/registration/
│   │   │   ├── controller/          # Web controllers
│   │   │   ├── model/               # JPA entities
│   │   │   ├── repository/          # Data access layer
│   │   │   ├── service/             # Business logic
│   │   │   ├── enums/               # Enumerations
│   │   │   └── TssaRegistrationApplication.java
│   │   └── resources/
│   │       ├── templates/           # Thymeleaf HTML templates
│   │       └── application.properties
├── pom.xml
└── README.md
```

## Configuration

Application configuration can be modified in `src/main/resources/application.properties`:

- Server port: Default is 8080
- Database settings: H2 in-memory database
- File upload limits: Configured for 10MB max file size

## Development

### Adding New Features

1. **Create/Update Entities**: Add new fields or entities in the `model` package
2. **Update Repositories**: Add new query methods in the `repository` package
3. **Implement Services**: Add business logic in the `service` package
4. **Create Controllers**: Add new endpoints in the `controller` package
5. **Update Templates**: Modify or create new HTML templates in `resources/templates`

### Database Migration

For production use, consider:
- Switching from H2 to a production database (MySQL, PostgreSQL, etc.)
- Implementing Flyway or Liquibase for database migrations
- Configuring proper connection pooling

## Security Considerations

This is a demonstration project. For production deployment, consider adding:
- Spring Security for authentication and authorization
- CSRF protection
- Input validation and sanitization
- Secure file storage (external storage service instead of database)
- HTTPS configuration
- Rate limiting

## Troubleshooting

**Port 8080 already in use?**
- Change the port in `application.properties`:
  ```
  server.port=8081
  ```

**Maven build fails?**
- Ensure you have Java 17 installed: `java -version`
- Ensure Maven is installed: `mvn -version`
- Try cleaning the project: `mvn clean install`

## License

This project is created for TSSA registration purposes.

## Support

For issues or questions, please contact the development team.
