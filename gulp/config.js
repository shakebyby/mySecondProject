/**
 * Created by wb-sfzy189670 on 2016/6/7.
 */
/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */

var src = './src'; var dest = './requireDirReset';
module.exports = {
    less: {
        src: src + "/less/**/*.less",settings:"less()",dest:dest+"/css"
    }
}; //所有less