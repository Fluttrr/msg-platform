# Use the OpenJDK 21 image as a base
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src ./src
ADD CorsConfig.java .

# Skip tests during the build process
RUN ./mvnw package -DskipTests

# Expose the application port
EXPOSE 50010

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/User-0.0.1-SNAPSHOT.jar"]