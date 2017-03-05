package x;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import static java.awt.image.BufferedImage.TYPE_INT_RGB;
import static x.Main.Direction.*;

public class Main {
    private static int currentStepsInOneDirection = 1;
    private static int stepMade = 0;
        private static boolean modusStart = true;

    public static void main(final String... args) throws IOException {
        // reminder to myself: this all does not make sense anymore.
        // see history to understand the complexity!
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
        final int MAIN = 1;
        final int MAIN_DIED = 0;
        final int ARROW = 2;
        final int ARROW_DIED = 3;
        int imageWidth = 16;
        int imageHeight = 16;
        int tiles = imageHeight * imageWidth;
        BufferedImage image = new BufferedImage(imageWidth * tiles, imageHeight, TYPE_INT_RGB);
        int offset = 0;
        int x = 0;
        int y = 0;
        Point p = new Point(7, 7);
        Direction eatYourselfUpDirection = RIGHT;
        ;
        while (offset < tiles) {
            xy[p.x][p.y] = xy[p.x][p.y] == MAIN ? MAIN_DIED : ARROW_DIED;
            while (y < imageHeight) {
                while (x < imageWidth) {
                    Color color;
                    if (xy[x][y] == MAIN_DIED) {
                        color = Color.BLACK;
                    } else {
                        color = Color.WHITE;
                    }
                    if (color != null)
                        image.setRGB(16 * offset + x, y, color.getRGB());
                    x++;
                }
                x = 0;
                y++;
            }
            y = 0;
            x = 0;
            offset++;

            // which direction should be self destructed next?
            System.out.println(p);
            switch (eatYourselfUpDirection) {
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
            if (++stepMade == currentStepsInOneDirection) {
                stepMade = 0;
                switch (eatYourselfUpDirection) {
                    case DOWN:
                        currentStepsInOneDirection += 1;
                        eatYourselfUpDirection = LEFT;
                        break;
                    case LEFT:
                        eatYourselfUpDirection = UP;
                        break;
                    case RIGHT:
                        eatYourselfUpDirection = DOWN;
                        break;
                    case UP:
                        currentStepsInOneDirection += 1;
                        eatYourselfUpDirection = RIGHT;
                        break;
                }
            }
        }
        File out = new File("/tmp/timeout.png");
        System.out.println("Writing: " + out.getAbsolutePath());
        ImageIO.write(image, "PNG", out);
    }

    public static Color getHueNeighbor(Color color, float nextDoors) {
        float change = nextDoors / 360.f;
        change %= 1;
        float is = getHue(color);
        float newHue = is + change;
        // must convert to rgb again
        int res = Color.HSBtoRGB(newHue, getSaturation(color), getValue(color));
        return new Color(res);
    }

    public static float getHue(Color color) {
        float[] res = getHSB(color);
        return res[0];
    }

    public static float getSaturation(Color color) {
        float[] res = getHSB(color);
        return res[1];
    }

    public static Color getValueNeighbor(Color color, int nextDoors) {
        float change = (float) nextDoors / 100.f;
        change %= 1;
        float is = getValue(color);
        float newValue = is + change;
        // must convert to rgb again
        int res = Color.HSBtoRGB(getHue(color), getSaturation(color), newValue);
        return new Color(res);
    }

    public static float getValue(Color color) {
        float[] res = getHSB(color);
        return res[2];
    }

    public static float[] getHSB(Color color) {
        return Color.RGBtoHSB(color.getRed(), color.getGreen(), color.getBlue(), null);
    }

    enum Direction {LEFT, RIGHT, UP, DOWN}
}
