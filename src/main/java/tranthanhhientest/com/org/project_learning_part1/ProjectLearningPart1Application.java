package tranthanhhientest.com.org.project_learning_part1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectLearningPart1Application {

	public static void main(String[] args) {
		SpringApplication.run(ProjectLearningPart1Application.class, args);
		String statement = "hello my boy";
		System.out.println("Hello World!");
		System.err.println(statement);
	}

}
