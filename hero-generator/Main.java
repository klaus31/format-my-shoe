import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;

import static java.awt.image.BufferedImage.TYPE_INT_RGB;
import static x.Main.Direction.*;

public class Main {
    public static void main(final String... args) throws IOException {
        int[][] xy = {
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
        };
        int tiles = 256;
        int imageWidth = 16;
        int imageHeight = 16;
        BufferedImage image = new BufferedImage(imageWidth * tiles, imageHeight, TYPE_INT_RGB);
        int colorBg = getColorBg();
        int colorFg = getColorFg();
        int offset = 0;
        int x = 0;
        int y = 0;
        Point p = new Point(0, 8);
        Direction direction = RIGHT;
        ;
        while (offset < tiles) {
            xy[p.x][p.y] = 0;
            while (y < imageHeight) {
                while (x < imageWidth) {
                    int color = xy[x][y] == 1 ? colorBg : colorFg;
                    image.setRGB(16 * offset + x, y, color);
                    x++;
                }
                x = 0;
                y++;
            }
            y = 0;
            x = 0;
            offset++;
            System.out.print(direction + ": " + p);
            String checkpoint = p.x + "/" + p.y;
            if(Arrays.asList("0/1","9/8", "0/7", "11/10", "0/5","13/12","0/3","15/14").contains(checkpoint)) {
                direction = UP;
            } else
            if(Arrays.asList("9/7", "10/9", "11/5", "12/11","13/3","14/13","15/1","15/0").contains(checkpoint)) {
                direction = LEFT;
            } else
            if(Arrays.asList("0/0", "0/2","0/4","0/6", "0/8", "0/10", "0/12", "0/14", "0/15").contains(checkpoint)) {
                direction = RIGHT;
            } else
            if(Arrays.asList("0/9", "0/11","0/13","0/15", "10/6", "12/4","14/2").contains(checkpoint)) {
                direction = DOWN;
            }
            System.out.println("next: " + direction);
            if(p.x == 0 && p.y == 0) {p = new Point(0,15); continue;}
            if(p.x == 15 && p.y == 15) {p = new Point(15,0); continue;}

            switch (direction) {
                case DOWN:
                    p = new Point(p.x, p.y + 1);
                    break;
                case LEFT:
                    p = new Point(p.x - 1, p.y);
                    break;
                case RIGHT:
                    p = new Point(p.x + 1, p.y);
                    break;
                case UP:
                    p = new Point(p.x, p.y - 1);
                    break;
            }
        }
        File out = new File("/tmp/hero.png");
        System.out.println("Writing: " + out.getAbsolutePath());
        ImageIO.write(image, "PNG", out);
    }

    ;

    private static int getColorBg() {
        int r = 0;
        int g = 200;
        int b = 0;
        return (r << 16) | (g << 8) | b;
    }

    private static int getColorFg() {
        int r = 50;
        int g = 50;
        int b = 50;
        return (r << 16) | (g << 8) | b;
    }

    enum Direction {LEFT, RIGHT, UP, DOWN}
}
