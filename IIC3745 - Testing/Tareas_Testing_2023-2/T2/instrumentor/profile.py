from profiler import *
import sys
import io

if __name__ == '__main__':
    stdout = sys.stdout
    sys.stdout = io.StringIO()
    profiler = Profiler.profile("input_code/" + sys.argv[1] + ".py")
    sys.stdout = stdout
    profiler.print_fun_report()
