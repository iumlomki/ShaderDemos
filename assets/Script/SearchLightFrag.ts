export default class SearchLightFrag{
    static search_light_vert = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }
    `;
    static search_light_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    uniform vec2 resolution;
    uniform vec2 mouse;
    varying vec2 v_texCoord;

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        mouse.y= resolution.y - mouse.y;

        vec2 uv = v_texCoord.xy ;
        vec4 tex = texture2D(CC_Texture0, uv);
        vec2 d = uv*resolution.xy -mouse.xy ;
        vec2 s = 0.15 * resolution.xy;
        float r = dot(d, d)/dot(s,s);
        fragColor =  tex * (1.08 - r);   
    }
    void main()
    {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `;
}
