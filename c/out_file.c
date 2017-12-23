/*
	$ gcc out_file.c
	$ ./a.out
*/

#include <stdio.h>
#include <time.h>

int main() {
	FILE *f = fopen("/tmp/out_file.txt", "a");
	if (f == NULL) {
		printf("Error opening file!\n");
		return(1);
	}

	// to get current time
	time_t rawtime;
	struct tm * timeinfo;
    time ( &rawtime );
    timeinfo = localtime ( &rawtime );

	/* print: integers floats character text*/
	int i = 1;
	float py = 3.1415927;
	char c = 'A';
	const char *text = "Write this to the file";
	printf("Integer: %d, float: %f, a character: %c, string: %s, time: %s \n", i, py, c, text, asctime(timeinfo));
	fprintf(f, "Integer: %d, float: %f, a character: %c, string: %s, time: %s \n", i, py, c, text, asctime(timeinfo));

	fclose(f);
}

