import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    redText: {
        fontSize: 20,
        color: 'red'
    },
    boldText: {
        fontWeight: 'bold',
        marginBottom: 4
    },
    centeredText: {
        textAlign: 'center',
        marginTop: 12
    },
    image: {
        width: '100%',
        margin: 'auto'
    }
});

export default function AvailableTemplates() {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.redText}>dsadsads</Text>
                    <Text style={styles.redText}>• Resume Templates</Text>
                    <Image style={styles.image} src="/assets/images/resume-minimal.png" />
                    <Text style={styles.centeredText}>*We are working on adding more Resume Templates</Text>
                </View>
            </Page>
        </Document>
    );
}
