package tranthanhhientest.com.org.project_learning_part1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
	"tranthanhhientest.com.org.project_learning_part1",
	"controller",
	"service",
	"repository",
	"security",
	"model",
	"dto"
})
@EnableMongoRepositories(basePackages = "repository")
public class ProjectLearningPart1Application {

	public static void main(String[] args) {
		SpringApplication.run(ProjectLearningPart1Application.class, args);
		System.out.println("Application started successfully!");
	}

}
